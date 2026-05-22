<?php

namespace App\Services;

class RapydSignatureService
{
    protected string $accessKey;
    protected string $secretKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->accessKey = config('services.rapyd.access_key');
        $this->secretKey = config('services.rapyd.secret_key');
        $this->baseUrl   = config('services.rapyd.base_url');
    }

    /**
     * Generate Rapyd signature payload
     */
    public function generate(
        string $method,
        string $url,
        mixed $body = '',
        string $baseUrlPlaceholder = '{{baseUrl}}'
    ): array {
        $timestamp = (string) (time() - 10);
        $salt = bin2hex(random_bytes(12));

        $normalizedBody = $this->normalizeBody($body);
        $urlPath = str_replace($baseUrlPlaceholder, '/v1', $url);

        $toSign =
            strtolower($method) .
            $urlPath .
            $salt .
            $timestamp .
            $this->accessKey .
            $this->secretKey .
            $normalizedBody;

        $hexSignature = hash_hmac('sha256', $toSign, $this->secretKey);
        $signature = base64_encode($hexSignature);

        return [
            'timestamp' => $timestamp,
            'salt' => $salt,
            'signature' => $signature,
            'access_key' => $this->accessKey,
        ];
    }

    /**
     * Normalize request body like Postman script
     */
    protected function normalizeBody(mixed $body): string
    {
        if (
            $body !== '' &&
            $body !== null &&
            $body !== '{}' &&
            !is_object($body)
        ) {
            return json_encode(json_decode($body, true), JSON_UNESCAPED_SLASHES);
        }

        return '';
    }
}